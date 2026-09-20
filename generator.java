import java.util.concurrent.ThreadLocalRandom;
public class Generator{
    public String generateCode(String route){
        String catalogue = "0123456789ABCDEFGHIJKLMNPQRSTUVWXYZ"; 
        String blank = ""; 
        for(int i = 0; i < 4; i++){
             int randomIndex = ThreadLocalRandom.current().nextInt(catalogue.length());
            blank = blank + catalogue.charAt(randomIndex);
        }
        String eircode = route + " " + blank;
        return eircode;
    }
}