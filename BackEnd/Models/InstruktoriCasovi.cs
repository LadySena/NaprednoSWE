using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BackEnd.Models
{
    [Table("InstruktoriCasovi")]
    public class InstruktoriCasovi
    {
        [Key]
        
        public int ID { get; set; }
       
        public int CasId {get;set;}
        public int InstruktorId  {get;set;}
      
        
    }
}