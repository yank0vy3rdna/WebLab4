package business;

import db.EntryDAO;
import db.UserDAO;
import models.Entry;
import models.User;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Stateless
public class Entries {
    @EJB
    private EntryDAO entryDAO;
    @EJB
    private Auth auth;

    public String addEntry(String base64, String x, String y, String r) {
        User current_user = auth.getUserByToken(base64);
        if (!auth.checkAuth(current_user, base64)) {
            return "Unauthorized";
        }
        try {
            entryDAO.createEntry(Double.valueOf(x), Double.valueOf(y), Double.valueOf(r), current_user);
        }catch (NumberFormatException e){
            return "Bad format";
        }
        return getEntries(base64);
    }

    public String getEntries(String base64) {
        User current_user = auth.getUserByToken(base64);
        if (!auth.checkAuth(current_user, base64)) {
            return "Unauthorized";
        }

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        List<Entry> entries = entryDAO.findEntries(current_user);
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("[");
        for (Entry entry : entries) {
            Date date = new Date(entry.getTimestamp());
            stringBuilder.append("{\"x\":\"");
            stringBuilder.append(entry.getX().toString());
            stringBuilder.append("\", \"y\":\"");
            stringBuilder.append(entry.getY().toString());
            stringBuilder.append("\", \"r\":\"");
            stringBuilder.append(entry.getR().toString());
            stringBuilder.append("\", \"timestamp\":\"");
            stringBuilder.append(formatter.format(date));
            stringBuilder.append("\"},");
        }
        stringBuilder.append("]");
        return stringBuilder.toString();
    }
}
