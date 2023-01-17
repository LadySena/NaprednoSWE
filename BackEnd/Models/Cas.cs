using System;
using System.IO;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace BackEnd.Models
{
    [Table("Cas")]
    public class Cas
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        public string Naziv { get; set; }

        //[Column("Tip")]
        //public string Tip {get;set;} //individualni,grupni

        [Column("Cena")]
        public int Cena { get; set; }

        [Column("Opis")]
        public string Opis {get;set;}

        // [NotMapped]
        // public IFormFile ProfilnaFileI { get;set;}

        // [NotMapped]
        // public string ProfilnaSrcI { get;set;}

        // [NotMapped]
        // public IFormFile ProfilnaFileII { get;set;}

        // [NotMapped]
        // public string ProfilnaSrcII { get;set;}

        // [NotMapped]
        // public IFormFile ProfilnaFileIII { get;set;}

        // [NotMapped]
        // public string ProfilnaSrcIII { get;set;}

        [JsonIgnore]
        public SkolaKlizanja SkolaKlizanja {get;set;}

     // public TreneriTreninga TreneriTreninga{get;set;}
         
        public virtual List<Termin> Termini {get;set;}
        
    }
}