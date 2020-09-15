package models;

import javax.persistence.*;
import java.util.List;

@Entity(name = User.PERSISTANCE_NAME)
@Table(name = User.PERSISTANCE_NAME )
public class User {
    static final String PERSISTANCE_NAME = "USER_TABLE";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "login", unique = true)
    private String login;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Entry> getMyEntries() {
        return myEntries;
    }

    public void setMyEntries(List<Entry> myEntries) {
        this.myEntries = myEntries;
    }

    @Column(name = "password")
    private String password;

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    @Column(name = "access_token")
    private String access_token;

    @OneToMany(mappedBy="owner")
    private List<Entry> myEntries;
}
