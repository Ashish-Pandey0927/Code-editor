window.onload = function () {
    // Initialize CodeMirror
    const editor = CodeMirror(document.getElementById("codeMirrorEditor"), {
        mode: "text/x-c++src",
        lineNumbers: true,
        theme: "midnight",
        value: "// Start coding here...\n"
    });
    editor.setSize("100%", "100%");

    // Run Code button functionality
    document.getElementById("runCode").addEventListener("click", async function () {
        const input = document.getElementById("inputArea").value;
        const code = editor.getValue();

        // Judge0 language IDs: 54 corresponds to C++
        const requestBody = {
            source_code: code,
            language_id: 54, // Change this if you're using another language
            stdin: input
        };

        try {
            // Send request to the local proxy server
            const response = await fetch("http://localhost:3000/api/submissions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error("Failed to execute code. Check your server setup.");
            }

            const result = await response.json();

            // Display output
            const outputBox = document.getElementById("outputBox");
            outputBox.textContent = result.stdout || result.stderr || "No output received.";
        } catch (error) {
            console.error("Error:", error);
            const outputBox = document.getElementById("outputBox");
            outputBox.textContent = `Error: ${error.message}`;
        }
    });
};
