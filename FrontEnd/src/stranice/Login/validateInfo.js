export default function validateInfo(values){

    let errors={};
    if(!values.ime.trim())
    {
        errors.ime="Morate uneti vaše ime";
    }
    if(!values.prezime.trim())
    {
        errors.prezime="Morate uneti vaše prezime";
    }
    if(!values.korisnickoIme.trim())
    {
        errors.prezime="Morate uneti vaše korisničko ime";
    }
    if(!values.email)
    {
        errors.email="Morate uneti vaš email";
        
    }
    else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email adresa nije validna';
      }

      if (!values.sifra) {
        errors.sifra = 'Morate uneti šifru';
      } else if (values.sifra.length < 6) {
        errors.sifra = 'Šifra mora imati minimalno 6 karaktera';
      }
    
      if (!values.potvrdaSifre) {
        errors.potvrdaSifre = 'Morate uneti šifru';
      } else if (values.potvrdaSifre !== values.sifra ) {
        errors.potvrdaSifre = 'Šifre se ne poklapaju';
      }
      return errors;

    
} 