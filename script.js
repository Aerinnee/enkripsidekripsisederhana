function method1Encrypt(text, salt) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i) + salt.length;
        result += String.fromCharCode(char);
    }
    return result;
}

function method1Decrypt(text, salt) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i) - salt.length;
        result += String.fromCharCode(char);
    }
    return result;
}

function method2Encrypt(text, salt) {
    const saltChars = salt.split('');
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const saltChar = saltChars[i % saltChars.length];
        result += String.fromCharCode(char.charCodeAt(0) + saltChar.charCodeAt(0) % 256);
    }
    return result;
}

function method2Decrypt(text, salt) {
    const saltChars = salt.split('');
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const saltChar = saltChars[i % saltChars.length];
        result += String.fromCharCode(char.charCodeAt(0) - (saltChar.charCodeAt(0) % 256));
    }
    return result;
}

function method3Encrypt(text, salt) {
    let result = '';
    const shift = salt.length;
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        result += String.fromCharCode(char + shift);
    }
    return result;
}

function method3Decrypt(text, salt) {
    let result = '';
    const shift = salt.length;
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        result += String.fromCharCode(char - shift);
    }
    return result;
}

document.getElementById('encryptButton').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const salt = document.getElementById('salt').value;
    const method = document.getElementById('encryptionMethod').value;

    let encryptedText;
    if (method === 'method1') {
        encryptedText = method1Encrypt(inputText, salt);
    } else if (method === 'method2') {
        encryptedText = method2Encrypt(inputText, salt);
    } else if (method === 'method3') {
        encryptedText = method3Encrypt(inputText, salt);
    }
    document.getElementById('outputText').value = encryptedText;
});

document.getElementById('decryptButton').addEventListener('click', () => {
    const outputText = document.getElementById('outputText').value;
    const salt = document.getElementById('salt').value;
    const method = document.getElementById('encryptionMethod').value;

    let decryptedText;
    if (method === 'method1') {
        decryptedText = method1Decrypt(outputText, salt);
    } else if (method === 'method2') {
        decryptedText = method2Decrypt(outputText, salt);
    } else if (method === 'method3') {
        decryptedText = method3Decrypt(outputText, salt);
    }
    document.getElementById('outputText').value = decryptedText;
});
