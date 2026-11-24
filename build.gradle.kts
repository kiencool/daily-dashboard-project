plugins {
    id("com.android.application") version "8.5.2" apply false
    id("org.jetbrains.kotlin.android") version "1.9.24" apply false
}

val localBuildRoot = java.io.File(
    System.getenv("LOCALAPPDATA") ?: System.getProperty("java.io.tmpdir"),
    "AndroidBuilds/oppo-dashboard-android"
)
layout.buildDirectory.set(java.io.File(localBuildRoot, "root"))
subprojects {
    layout.buildDirectory.set(java.io.File(localBuildRoot, name))
}
