package dao;

import models.User;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;

public class UserDAO {
    private final EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory( "default" );

    public User getUserByName(String nickname) {
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();
        String queryString = "SELECT a FROM USER_TABLE a " +
                "WHERE a.login IS NULL OR LOWER(a.login) = LOWER(:nickname)";

        TypedQuery<User> query = entityManager.createQuery(queryString, User.class);
        query.setParameter("nickname", nickname);
        return query.getResultList().get(0);
    }
}
