package business;

import dao.UserDAO;
import models.User;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;

import javax.ejb.Stateless;
import java.util.List;

@Stateless
public class Auth {
    private static SessionFactory factory;

    public Integer register(String login, String password) {
        try {
            factory = new Configuration().configure().buildSessionFactory();
        } catch (Throwable ex) {
            System.err.println("Failed to create sessionFactory object." + ex);
            throw new ExceptionInInitializerError(ex);
        }

        Transaction tx = null;
        Integer user_id = null;
        try (Session session = factory.openSession()) {
            tx = session.beginTransaction();
            User new_user = new User();
            new_user.setLogin(login);
            new_user.setPassword(password);
            user_id = (Integer) session.save(new_user);
            tx.commit();
        } catch (HibernateException e) {
            if (tx != null) tx.rollback();
            e.printStackTrace();
        }

        return user_id;
    }

    public String login(String login, String password) {
        UserDAO user_dao = new UserDAO();
        User user = user_dao.getUserByName(login);
        return user.getId().toString();
    }
}
