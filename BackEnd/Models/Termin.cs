using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System;
namespace BackEnd.Models
{
    [Table("Termin")]
    public class Termin   
    {

        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        public string NazivCasa { get; set; }

        [Column("KorisnickoImeInstruktora")]
        public string KorisnickoImeInstruktora {get;set;}

        [Column("ImeInstruktora")]
        public string ImeInstruktora {get;set;}

        [Column("PrezimeTrenera")]
        public string PrezimeInstruktora {get;set;}
        
        [Column("Datum")]
        public string  Datum { get; set; }

        [Column("VremePocetka")]
        public string VremePocetka {get;set;}
        
        [Column("VremeKraja")]
        public string VremeKraja {get;set;}
        
        [Column("TrenutnoOsoba")]
        public int TrenutnoOsoba { get; set; }    

        [Column("MaxOsoba")]
         public int MaxOsoba { get; set; }       
  
    }
}