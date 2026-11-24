package com.oppodesk.dashboard

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.speech.RecognizerIntent
import android.speech.tts.TextToSpeech
import android.view.WindowManager
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import java.util.Locale

class MainActivity : AppCompatActivity(), TextToSpeech.OnInitListener {

    private lateinit var webView: WebView
    private var tts: TextToSpeech? = null
    private var ttsReady = false

    private val voiceLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == Activity.RESULT_OK) {
            val matches = result.data?.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS)
            val spoken = matches?.firstOrNull()?.trim()
            if (!spoken.isNullOrEmpty()) {
                val quoted = JSONObject.quote(spoken)
                webView.post {
                    webView.evaluateJavascript("window.onNativeVoiceResult && window.onNativeVoiceResult($quoted);", null)
                }
            }
        }
    }

    inner class AndroidBridge {
        @JavascriptInterface
        fun fetchGoldHtml(targetUrl: String) {
            Thread {
                try {
                    val conn = (URL(targetUrl).openConnection() as HttpURLConnection).apply {
                        connectTimeout = 8000
                        readTimeout = 8000
                        requestMethod = "GET"
                        setRequestProperty("User-Agent", "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36")
                    }
                    val html = conn.inputStream.bufferedReader(Charsets.UTF_8).use { it.readText() }
                    conn.disconnect()
                    val quoted = JSONObject.quote(html)
                    webView.post {
                        webView.evaluateJavascript("window.onNativeGoldHtml && window.onNativeGoldHtml($quoted);", null)
                    }
                } catch (e: Exception) {
                    val err = JSONObject.quote(e.message ?: "Fetch error")
                    webView.post {
                        webView.evaluateJavascript("window.onNativeGoldError && window.onNativeGoldError($err);", null)
                    }
                }
            }.start()
        }

        @JavascriptInterface
        fun setScreenBrightness(level: Float) {
            runOnUiThread {
                val lp = window.attributes
                lp.screenBrightness = level
                window.attributes = lp
            }
        }

        @JavascriptInterface
        fun startVoiceInput() {
            runOnUiThread {
                try {
                    val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
                        putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
                        putExtra(RecognizerIntent.EXTRA_LANGUAGE, "vi-VN")
                        putExtra(RecognizerIntent.EXTRA_PROMPT, "Nói câu hỏi cho trợ lý...")
                    }
                    voiceLauncher.launch(intent)
                } catch (e: Exception) {
                    val err = JSONObject.quote("Thiết bị chưa bật Google Voice Typing.")
                    webView.evaluateJavascript("window.onNativeVoiceError && window.onNativeVoiceError($err);", null)
                }
            }
        }

        @JavascriptInterface
        fun speak(text: String) {
            speakWithLang(text, "vi-VN")
        }

        @JavascriptInterface
        fun speakWithLang(text: String, langTag: String) {
            if (!ttsReady) return
            runOnUiThread {
                val loc = if (langTag.startsWith("ja")) Locale.JAPAN else Locale("vi", "VN")
                tts?.setLanguage(loc)
                val clean = text.replace(Regex("[*#`•]"), " ").trim()
                tts?.speak(clean, TextToSpeech.QUEUE_FLUSH, null, "ai_reply")
            }
        }

        @JavascriptInterface
        fun stopSpeak() {
            runOnUiThread {
                tts?.stop()
            }
        }
    }

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            val res = tts?.setLanguage(Locale("vi", "VN"))
            ttsReady = res != TextToSpeech.LANG_MISSING_DATA && res != TextToSpeech.LANG_NOT_SUPPORTED
            if (!ttsReady) {
                tts?.setLanguage(Locale.US)
                ttsReady = true
            }
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        tts = TextToSpeech(this, this)
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        enableImmersiveMode()

        webView = WebView(this).apply {
            setBackgroundColor(Color.parseColor("#F4F5FB"))
            webViewClient = WebViewClient()
            webChromeClient = WebChromeClient()
            addJavascriptInterface(AndroidBridge(), "AndroidBridge")

            settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true
                databaseEnabled = true
                allowFileAccess = true
                @Suppress("DEPRECATION")
                allowUniversalAccessFromFileURLs = true
                mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                cacheMode = WebSettings.LOAD_DEFAULT
                mediaPlaybackRequiresUserGesture = false
            }
        }

        setContentView(webView)
        webView.loadUrl("file:///android_asset/dashboard/index.html")

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack()
                } else {
                    moveTaskToBack(true)
                }
            }
        })
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
        webView.resumeTimers()
    }

    override fun onPause() {
        super.onPause()
        tts?.stop()
        webView.onPause()
        webView.pauseTimers()
    }

    override fun onDestroy() {
        tts?.shutdown()
        super.onDestroy()
    }

    override fun onWindowFocusChanged(hasFocus: Boolean) {
        super.onWindowFocusChanged(hasFocus)
        if (hasFocus) {
            enableImmersiveMode()
        }
    }

    private fun enableImmersiveMode() {
        WindowCompat.setDecorFitsSystemWindows(window, false)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            val lp = window.attributes
            lp.layoutInDisplayCutoutMode =
                WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES
            window.attributes = lp
        }
        val controller = WindowInsetsControllerCompat(window, window.decorView)
        controller.systemBarsBehavior =
            WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        controller.hide(WindowInsetsCompat.Type.systemBars())
    }
}
