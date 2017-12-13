function generateEmail(user, type) {
    if(type === 'validate') {
        return `
            <p>Dear ${user.name},</p>
            <p>Listed below is your code for validating your email for the SportsBuddy platform.</p>
            <br>
            <b>${user.validationCode}</b>
            <br>            
            <p>Please use it at this link http://localhost:2000/auth/validate in order to validate it.</p>
            <br>
            <p>Sincerely yours,</p>
            <p>the SportsBuddy team</p>      
        `
    } else if(type === 'change password') {
        return `
            <p>Dear ${user.name}, </p>
            <p>Listed below is your code for changing your password for the SportsBuddy platform.</p> 
            <br>
            <b>${user.validationCode}</b>
            <br>
            <p>Please use it at this link http://localhost:2000/auth/change-password in order to validate it.</p><br>
            <br>
            <p>Sincerely yours,</p>
            <p>The SportsBuddy team</p>
        `
    }
}

module.exports = generateEmail;