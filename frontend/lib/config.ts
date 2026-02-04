/**
 * Application Configuration
 * Centralized configuration for app-wide constants
 */

export const APP_CONFIG = {
    appName: process.env.NEXT_PUBLIC_APP_NAME || "IslandLink",
    appTagline: process.env.NEXT_PUBLIC_APP_TAGLINE || "Logistics Management System",
    companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || "IslandLink Logistics",

    // API Configuration
    api: {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
        timeout: 30000, // 30 seconds
    },
} as const;