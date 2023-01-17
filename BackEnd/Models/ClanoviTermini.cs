using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BackEnd.Models
{
    [Table("ClanoviTermini")]
    public class ClanoviTermini
    {
        [Key]
        
        public int ID { get; set; }
       
        public int ClanoviId {get;set;}
        public int TerminId  {get;set;}
      
        
    }
}