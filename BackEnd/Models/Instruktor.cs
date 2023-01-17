using System;
using System.IO;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace BackEnd.Models
{
    [Table("Instruktor")]
    public class Instruktor:KorisnikSajta
    {
      
    [Column("Opis")]
    public string Opis {get;set;}

    }
    
}