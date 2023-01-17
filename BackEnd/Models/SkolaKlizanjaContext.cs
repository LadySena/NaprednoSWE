using Microsoft.EntityFrameworkCore;
namespace BackEnd.Models
{
    public class SkolaKlizanjaContext:DbContext
    {
        public DbSet<SkolaKlizanja> SkolaKlizanja {get;set;}
        public DbSet<ClanSkoleKlizanja> ClanoviSkoleKlizanja {get;set;}
        public DbSet<Instruktor> Instruktori {get;set;}
        public DbSet<Termin> Termini {get;set;}
        public DbSet<Cas> Casovi{get;set;}
        public DbSet<InstruktoriCasovi> InstruktoriCasovi {get;set;}
        public DbSet<ClanoviTermini> ClanoviTermini {get;set;}
        public SkolaKlizanjaContext(DbContextOptions options):base(options)
        {

        }

    }

}