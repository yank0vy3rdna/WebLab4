package business;

import db.UserDAO;
import models.User;

import javax.ejb.EJB;
import javax.ejb.Stateless;

@Stateless
public class Auth {
    @EJB
    private UserDAO userDAO;

    public String register(String login, String password) {
        User user = userDAO.findUser(login);
        if (user != null) {
            return "User already exists";
        }
        user = userDAO.createUser(login, password);
        if (user == null) {
            return "Error";
        }
        return user.getId().toString();
    }

    public String login(String login, String password) {
        User user = userDAO.findUser(login);
        if (user == null) {
            return "No such user found";
        }
        boolean result = userDAO.checkPassword(user, password);
        if (result) {
            return user.generateAccessToken();
        }
        return "Not authorized";
    }

    public boolean checkAuth(String accessToken) {
        User user = userDAO.findUserByAccessToken(accessToken);
        return user != null;
    }
}
