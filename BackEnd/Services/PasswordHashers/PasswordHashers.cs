using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Models;
namespace BackEnd.Services.PasswordHashers
{
    public class PasswordHashers: IPasswordHashers
    {
       
       public string HashPassword(string password)
       {
           return BCrypt.Net.BCrypt.HashPassword(password);
       }
    }
}