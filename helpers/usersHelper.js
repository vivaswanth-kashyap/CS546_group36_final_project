export function onlyString(s)
{
    // Return true if input is a string (even numeric string is true)
    return typeof s === 'string' || s instanceof String;
}

export function onlyNumber(n)
{
    // Return True if input is a number
    return typeof n === "number";
}

export function onlyArray(a)
{
    // Return True if input is an array
    return Array.isArray(a);
}

export function onlyObject(o)
{
    // Return True if input is an Object (not an array)
    return typeof o === 'object' && !onlyArray(o) && o != null;
}

export function onlyBoolean(b)
{
    // Return True if input is boolean
    return typeof b === 'boolean';
}

// Special methods for users.js

export function validString(s)
{
    // Returns a valid trimmed string
    if (!onlyString(s)) throw `Input not a String`;
    s = s.trim();
    if (s.length == 0) throw `String is empty`;
    return s;
}

export function validEmail(e)
{
    // Returns true if email is valid
    // Rules: @ must be present, . must be present, no spaces in the middle, chars must be letters or numbers or dashes (- and _)
    // ends with stevens.edu (case Insensitive)

    let allow = "abcdefghijklmnopqrstuvwxyz0123456789-_".split("");
    e = e.split('@');
    if (e.length != 2) return false;

    for (let i of e[0])
    {
        if (!allow.includes(i.toLowerCase())) return false;
    }

    let last = e[1].toLowerCase();
    if (last != "stevens.edu") return false;

    return true;
}

export function validPassword(p)
{
    // Retruns true if the password is valid
    // no spaces allowed, atleast 8 length, atleast 1 uppercase, atleast 1 number, atleast 1 speacial chars
    // the password is a string and already trimmed
    if (p.length < 8) return false;
    
    let condition = {"uppercase": 0, "number": 0, "special": 0};
    let numRegex = /^\d+$/;
    let charRegex = /^[a-zA-Z]+$/;

    for (let i of p)
    {
        if (i == " ") return false;
        if (i == i.toUpperCase()) condition.uppercase += 1;
        if (numRegex.test(i)) condition.number += 1;
        if (!numRegex.test(i) && !charRegex.test(i)) condition.special += 1;
    }

    if (condition.uppercase + condition.number + condition.special < 3) return false;

    return true;
}

export function validStatus(s)
{
    // Returns true if the status is valid
    // Status is basically the user's position at stevens (undergraduate, graduate, doctoral, non-degree, certificate-programs, teacher, other)
    
    // add to the list if needed
    let allow = ["undergraduate", "graduate", "doctoral", "non-degree", "certificate-programs", "teacher", "other"];

    if (!allow.includes(s)) return false;

    return true;
}