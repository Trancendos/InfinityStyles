console.log(`🔒 Fix XSS vulnerability in ChartStyle component

🎯 **What:** The \`ChartStyle\` component was rendering user-provided CSS configuration values inside a \`dangerouslySetInnerHTML\` style block without any sanitization.
⚠️ **Risk:** An attacker could inject malicious strings (e.g., \`</style><script>alert(1)</script>\`) into the chart configuration. When rendered, this would allow arbitrary JavaScript execution (XSS).
🛡️ **Solution:** Replaced \`dangerouslySetInnerHTML\` with standard React children rendering (e.g. \`<style>{cssString}</style>\`). React natively escapes occurrences of \`</style>\` in child string nodes within \`<style>\` tags (rendering it as \`</\\73 tyle>\`), mitigating the vulnerability cleanly and efficiently without needing external libraries like DOMPurify.`);
