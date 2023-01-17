using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace BackEnd.Models
{
    [Table("SkolaKlizanja")]
    public class SkolaKlizanja
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        public string Naziv { get; set; }

        public virtual List <ClanSkoleKlizanja> ClanoviSkoleKlizanja {get;set;}
        public virtual List <Cas> Casovi {get;set;}    
        public virtual List <Instruktor> Instruktori {get;set;}
    }

}