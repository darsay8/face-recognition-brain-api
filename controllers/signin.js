const handleSignin = (db, bcrypt) => (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(404).json('Incorrect form submission')
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(pass => {
            const isValid = bcrypt.compareSync(password, pass[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user'))
            } else {
                res.status(400).json('Wrong credentials')
            }

        })
        .catch(err => res.status(400).json('Wrong credentials'))
};

module.exports = {
    handleSignin: handleSignin
};