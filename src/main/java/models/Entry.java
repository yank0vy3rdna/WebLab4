package models;

import javax.persistence.*;

@Entity(name = Entry.PERSISTANCE_NAME)
@Table(name = Entry.PERSISTANCE_NAME )
@NamedQuery(name = "entries.findByOwner", query = "from ENTRY where owner = :owner order by timestamp")
public class Entry {
    static final String PERSISTANCE_NAME = "ENTRY";
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "id_Sequence")
    @SequenceGenerator(name = "id_Sequence", sequenceName = "ID_SEQ")
    private Long id;
    @Column(name = "x")
    private Double X;
    @Column(name = "y")
    private Double Y;
    @Column(name = "r")
    private Double R;
    @Column(name = "timestamp")
    private long timestamp;


    @ManyToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private User owner;
    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }


    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    private boolean result;

    public Double getX() {
        return X;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public void check() {
        if ((X == null) || (Y == null) || (R == null))
            throw new NullPointerException();
        if ((X == 0 && Math.abs(Y) <= R) || (Y == 0 && ((X >= 0 && X <= R) || (X <= 0 && X >= -R / 2))))
            this.result = true;
        else if ((X < 0) && (Y < 0))
            this.result = false;
        else if ((X > 0) && (Y > 0)) {
            this.result = Y <= R - 2 * X;
        } else if ((X > 0) && (Y < 0)) {
            this.result = X * X + Y * Y <= R * R;
        } else if ((X < 0) && (Y > 0)) {
            this.result = (X >= -R / 2) && (Y <= R);
        }
    }

    public void setX(Double x) {
        X = x;
    }

    public Double getY() {
        return Y;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setY(Double y) {
        Y = y;
    }

    public Double getR() {
        return R;
    }

    public void setR(Double r) {
        R = r;
    }

    public Entry() {
    }
}
