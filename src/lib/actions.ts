"use server";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Server Action to upload an image to Firebase Storage.
 * This bypasses browser-side CORS issues.
 */
export async function uploadImageAction(formData: FormData) {
    const file = formData.get("file") as File;
    if (!file) {
        return { success: false, error: "No file provided" };
    }

    try {
        console.log("Server Action: Starting upload for", file.name);
        const timestamp = Date.now();
        const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
        const storageRef = ref(storage, `products/${timestamp}_${sanitizedFileName}`);

        // Convert File to ArrayBuffer for server-side compatibility with uploadBytes
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        console.log("Server Action: Uploading to", storageRef.fullPath);
        const snapshot = await uploadBytes(storageRef, uint8Array);

        console.log("Server Action: Getting download URL");
        const downloadURL = await getDownloadURL(snapshot.ref);

        return { success: true, url: downloadURL };
    } catch (error: any) {
        const fs = require('fs');
        const logPath = 'c:/Users/kuria/.gemini/antigravity/scratch/parfumerie/server_log.txt';
        const errorDetails = {
            message: error.message,
            code: error.code,
            serverResponse: error.serverResponse,
            stack: error.stack,
            env: {
                NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            },
            fullError: error
        };

        fs.appendFileSync(logPath, `\n[${new Date().toISOString()}] Server Action Upload Error:\n${JSON.stringify(errorDetails, null, 2)}\n`);

        console.error("Server Action Upload Error Details:");
        console.error("- Message:", error.message);
        console.error("- Code:", error.code);
        console.error("- Bucket:", storage.app.options.storageBucket);
        console.error("- Server Response:", error.serverResponse);
        console.error("- Full Error:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));

        return {
            success: false,
            error: `Firebase Storage Error (${error.code || 'unknown'}): ${error.message}. See server_log.txt for details.`
        };
    }
}
