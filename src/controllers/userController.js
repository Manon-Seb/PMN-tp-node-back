const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.userRegister = (req, res) => {
    // on encrypte le mot de passe
    let encryptedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    let newUser = new User({email: req.body.email, password: encryptedPassword, role: req.body.role});

    newUser.save((error, user) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            });
        } else {
            res.status(201);
            res.json({
                message: `Utilisateur crée : ${user.email}`
            });
        }
    });
}

exports.userLogin = (req, res) => {
    // Rechercher l'utilisateur
    User.findOne({
        email: req.body.email
    }, (error, user) => {
        // Si l'utilisateur n'est pas trouvé
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            });
        }
        // Si l'utilisateur est trouvé
        else {
            // Si l'email et le mot de passe correspondent
            if (user != null) {
                if (user.email === req.body.email && 
                    // Si le mot de passe correspond au hash
                    bcrypt.compareSync(req.body.password, user.password) === true) {
                    jwt.sign({
                        user : {
                            id: user._id,
                            email: user.email,
                            role: user.role
                        }
                    }, process.env.JWT_KEY, {
                        expiresIn: "30 days"
                    }, (error, token) => {
                        if (error) {
                            res.status(500);
                            console.log(error);
                            res.json({
                                message: "Erreur serveur."
                            });
                        } else {
                            res.status(200);
                            res.json({
                                token
                            });
                        }
                    })
                } else {
                    res.status(403);
                    console.log(error);
                    res.json({
                        message: "Authentification incorrecte."
                    });
                }
            }
            // Si l'email et le mot de passe ne correspondent pas
            else {
                res.status(403);
                console.log(error);
                res.json({
                    message: "Authentification incorrecte."
                });
            }
        }
    });
}