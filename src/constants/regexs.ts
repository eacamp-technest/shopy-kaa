export class Regexs {
  public static fullName = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/
  public static email =
    /(^|\s|:)(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;
  public static password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{8,32}$/;
  public static numbers = /^[0-9]*$/;
  public static phone = /^\d{3} \d{3} \d{2} \d{2}$/;
  public static includeNumber = /\d/;
  public static Visa_Master_Card = /[25][1-7][0-9]{14}/;
  public static holderName = /^((?:[A-Za-z]+ ?){1,3})$/;
  public static cvv = /^[0-9]{3, 4}$/;
  public static cardNumber = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
  public static cardHolder = /^[A-Za-z ]{2,50}$/;
  public static expirationDate = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
}