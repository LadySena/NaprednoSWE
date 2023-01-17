using System;
using System.IO;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using BackEnd.Models;
using System.IdentityModel.Tokens.Jwt;
using BackEnd.Services.PasswordHashers;
using BackEnd.Response;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;
using BackEnd.Services;
using Microsoft.AspNetCore.Hosting;
namespace BackEnd.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SkolaKlizanjaController : ControllerBase
    {
    
        private readonly JwtService _jwtService;
        private readonly IWebHostEnvironment _hostEnvironment;
        public SkolaKlizanjaContext Context{get;set;}
        public SkolaKlizanjaController(SkolaKlizanjaContext context,JwtService service,IWebHostEnvironment env)
        {
            Context=context;
            _jwtService=service;
           this. _hostEnvironment=env;
        
        }

        [Route("PreuzmiSkoluKlizanja")]
        [HttpGet]
        public async Task<List<SkolaKlizanja>> PreuzmiSkoluKlizanja()
        {
            return await Context.SkolaKlizanja.Include(p=>p.ClanoviSkoleKlizanja).Include(p=>p.Instruktori).Include(p=>p.Casovi).ToListAsync();

        }

        [Route("PreuzmiClanove")]
        [HttpGet]
        public async Task<List<ClanSkoleKlizanja>> PreuzmiClanoveSkoleKlizanja()
        {
            return await Context.ClanoviSkoleKlizanja.ToListAsync();
        }

        [Route("PreuzmiInstruktore")]
        [HttpGet]
        public async Task<List<Instruktor>> PreuzmiInstruktore()
        {
            return await Context.Instruktori.ToListAsync();
        }

        //[Route("PreuzmiTreningeTrenera")]
      /*  [HttpGet]
        public async Task<List<TreninziTrenera>> PreuzmiTreningeTrenera()
        {
           return await Context.TreninziTrenera.Include(p=>p.TreninziZadatogTrenera).ToListAsync();
        }
         [Route("PreuzmiTrenereTreninga")]
        [HttpGet]
        public async Task<List<TreneriTreninga>> PreuzmiTrenereTreninga()
        {
           return await Context.TreneriTreninga.Include(p=>p.TreneriZadatogTreninga).ToListAsync();
        }
         [Route("PreuzmiTrenereTreninga/{id}")]
        [HttpGet]
        public async Task<List<Trener>> PreuzmiTrenere(int id)
        {
             var trening= await Context.Treninzi.Where(p=>p.ID==id).FirstOrDefaultAsync();
            var treneri= await Context.TreneriTreninga.Include(p=>p.TreneriZadatogTreninga).Where(p=>p.NazivTreninga==trening.Naziv).FirstOrDefaultAsync();
            return treneri.TreneriZadatogTreninga;
        }
        [Route("PreuzmiTreningeTrenera/{id}")]
        [HttpGet]
        public async Task<List<Trening>> PreuzmiTreningeTrenera(int id)
        {
            var trener= await Context.Treneri.Where(p=>p.ID==id).FirstOrDefaultAsync();
            var treninzi= await Context.TreninziTrenera.Include(p=>p.TreninziZadatogTrenera).Where(p=>p.KorisnickoImeTrenera==trener.KorisnickoIme).FirstOrDefaultAsync();
            return treninzi.TreninziZadatogTrenera;
       }
        
     */
        

        [Route("PreuzmiCasove")]
        [HttpGet]
        public async Task<List<Cas>> PreuzmiCasove()
        {
            return await Context.Casovi.Include(p=>p.Termini).ToListAsync();
        }
        
        [Route("DodajSkoluKlizanja")]
        [HttpPost]
        public async Task DodajSkoluKlizanja([FromBody] SkolaKlizanja skola)
        {
            Context.SkolaKlizanja.Add(skola);
            await Context.SaveChangesAsync();

        }

        [Route("DodajCas")]
        [HttpPost]
        public async Task DodajCas([FromBody] Cas cas)
        {
            SkolaKlizanja skola = await Context.SkolaKlizanja.Where(p=>p.Naziv=="Ice magic").FirstOrDefaultAsync();
            cas.SkolaKlizanja = skola;
             
            Context.Casovi.Add(cas);
            
            await Context.SaveChangesAsync();
        }

        [Route("FindUserByEmail")]
        [HttpGet]
        public async Task<ClanSkoleKlizanja> FindUserByEmail(string email)
        {
            ClanSkoleKlizanja kor = await Context.ClanoviSkoleKlizanja.Where(p=>p.Email==email).FirstOrDefaultAsync();
            return kor;
        }

        [Route("FindAnyUserByEmail")]
         [HttpGet]
        public async Task<KorisnikSajta> FindAnyUserByEmail(string email)
        {
            ClanSkoleKlizanja kor = await Context.ClanoviSkoleKlizanja.Where(p=>p.Email==email).FirstOrDefaultAsync();
            if(kor == null)
            {
                Instruktor instruktor = await Context.Instruktori.Where(p=>p.Email==email).FirstOrDefaultAsync();
                {
                    if(instruktor != null)
                    {
                        return instruktor;
                    }
                    else return null;
                }
            }
            else return kor;
        }

        [Route("FindAnyUserByUserName")]
        [HttpGet]
        public async Task<KorisnikSajta> FindAnyUserByUserName(string username)
        {

            ClanSkoleKlizanja kor = await Context.ClanoviSkoleKlizanja.Where(p=>p.KorisnickoIme==username).FirstOrDefaultAsync();
            if(kor==null)
            {
                Instruktor instruktor = await Context.Instruktori.Where(w=>w.KorisnickoIme==username).FirstOrDefaultAsync();
                {
                    if(instruktor!=null)
                    {
                        return instruktor;
                    }
                    else return null;
                }
            }
            else return kor;
        }

        [Route("FindInstruktorByEmail")]
        [HttpGet]
        public async Task<Instruktor> FindInstruktorByEmail(string email)
        {
            Instruktor kor = await Context.Instruktori.Where(p=>p.Email==email).FirstOrDefaultAsync();
            return kor;
        }

        [Route("FindUserById")]
        [HttpGet]
        public async Task<KorisnikSajta> FindUserById(int id)
        {
            ClanSkoleKlizanja kor = await Context.ClanoviSkoleKlizanja.Where(p=>p.ID==id).FirstOrDefaultAsync();
            if(kor==null)
            {
                Instruktor instruktor= await Context.Instruktori.Where(w=>w.ID==id).FirstOrDefaultAsync();
                {
                    if(instruktor!=null)
                    {
                        return instruktor;
                    }
                    else return null;
                }
            }
            else return kor;
        }
  
        [Route("ObrisiClana/{id}")]
        [HttpDelete]
        public async Task ObrisiClana(int id)
        {
            ClanSkoleKlizanja clan = await Context.ClanoviSkoleKlizanja.Where(p=>p.ID==id).FirstOrDefaultAsync();
                      
            Context.ClanoviSkoleKlizanja.Remove(clan);
            await Context.SaveChangesAsync();
        }

        [Route("ObrisiCas/{id}")]
        [HttpDelete]
        public async Task ObrisiCas(int id)
        {
            Cas cas = await Context.Casovi.Include(p=>p.Termini).Where(p=>p.ID==id).FirstOrDefaultAsync();
             
            foreach (var termin in cas.Termini)
            {
                 Context.Remove(termin);
            }

            Context.Casovi.Remove(cas);
           
            await Context.SaveChangesAsync();
        }

        [Route("PreuzmiCas/{id}")]
        [HttpGet]
        public async Task<Cas> PreuzmiCas(int id)
        {
            Cas cas = await Context.Casovi.FindAsync(id);
            return cas;
        }

        [Route("RegisterKorisnik")]
        [HttpPost]
        public async Task<IActionResult> RegisterKorisnik([FromBody] KorisnikSajta korisnik)
        {
            if(!ModelState.IsValid)
            {
                IEnumerable<string> errors = ModelState.Values.SelectMany(v=>v.Errors.Select(e=>e.ErrorMessage));
                return BadRequest(new ErrorResponse(errors));
            }
            if(korisnik.Sifra != korisnik.PotvrdaSifre)
            {
                return BadRequest(new ErrorResponse("Šifra se ne poklapaju."));
            }
           
           KorisnikSajta proveraEmaila = await this.FindAnyUserByEmail(korisnik.Email);
           if(proveraEmaila != null)
           {
              
               return BadRequest("Email već postoji.");

           }
            KorisnikSajta proveraKorisnickogImena = await this.FindAnyUserByUserName(korisnik.KorisnickoIme);
            if(proveraKorisnickogImena != null)
            {
                return Conflict(new ErrorResponse("Korisničko ime već postoji."));
            }
            
            string salt=BCrypt.Net.BCrypt.GenerateSalt();
          
            string confirmPass = korisnik.PotvrdaSifre+salt;
            string hashPass = BCrypt.Net.BCrypt.HashPassword(korisnik.Sifra,salt);
            string hashconfirmPass = BCrypt.Net.BCrypt.HashPassword(confirmPass,salt);
           
            SkolaKlizanja skola = await Context.SkolaKlizanja.Where(p=>p.Naziv=="Ice magic").FirstOrDefaultAsync();
    
            if(korisnik.Tip==1)
            {
                Instruktor instruktor = new Instruktor();
                instruktor.Ime = korisnik.Ime;
                instruktor.Prezime = korisnik.Prezime;
                instruktor.Telefon = korisnik.Telefon;
                instruktor.Email = korisnik.Email;
                instruktor.Tip = korisnik.Tip;
                instruktor.KorisnickoIme = korisnik.KorisnickoIme;
                instruktor.SkolaKlizanja = skola;
                instruktor.Sifra = hashPass;
                instruktor.PotvrdaSifre=hashconfirmPass;
                instruktor.RAND_SALT=salt;

                Context.Instruktori.Add(instruktor);
                instruktor.ID = await Context.SaveChangesAsync();
                return Ok(instruktor);
                
            }
            else if(korisnik.Tip == 2)
            {
                ClanSkoleKlizanja clan = new ClanSkoleKlizanja();
                clan.Ime = korisnik.Ime;
                clan.Prezime = korisnik.Prezime;
                clan.Telefon = korisnik.Telefon;
                clan.Email = korisnik.Email;
                clan.Tip = korisnik.Tip;
                clan.KorisnickoIme = korisnik.KorisnickoIme;
                clan.SkolaKlizanja = skola;
                clan.Sifra = hashPass;
                clan.PotvrdaSifre = hashconfirmPass;
                clan.RAND_SALT = salt;

                Context.ClanoviSkoleKlizanja.Add(clan);
                
                await Context.SaveChangesAsync();
                return Ok(clan);
            }
            else
            {
                return BadRequest();
            }
          
        }
     
        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] KorisnikSajta korisnik)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(new ErrorResponse("Došlo je do greške."));
            }
            var korisnickoIme = korisnik.KorisnickoIme;
            KorisnikSajta korisnikSajta = await this.FindAnyUserByUserName(korisnickoIme);
            if(korisnikSajta == null)
            {
                return BadRequest(new ErrorResponse("Član sa ovim korisničkim imenom ne postoji."));
            }
            
            string hashPass=BCrypt.Net.BCrypt.HashPassword(korisnik.Sifra,korisnikSajta.RAND_SALT);
            
            if(hashPass!=korisnikSajta.Sifra)
            {
                return Conflict(new ErrorResponse("Pogrešna šifra!"));
            }

            //Generisanje JWT tokena 

            SecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("0TjrED4Ag5otmv-zXYKjlGu73glokiAtQ72HlcptvMn8dhSad-fSiPtUPnLkETbdDX3mWp4_lgac--qQfpHMATAlAK8Aw0vseATcSMTb1aUkyeKi585EqXekM5tBKqWftmmqbhW_2uVdsGT58HVdWCjVV6TSprBRCPqKWgw5l_0"));
            SigningCredentials credentials = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);
            var header = new JwtHeader(credentials);
            
            var payload = new JwtPayload(korisnikSajta.ID.ToString(),null,null,null,DateTime.UtcNow.AddDays(1));
            JwtSecurityToken token = new JwtSecurityToken(header,payload); //Kreirali smo JWT token
            string jwt = new JwtSecurityTokenHandler().WriteToken(token);
            Response.Cookies.Append("jwt",jwt,new CookieOptions
            {
                HttpOnly=true
            });
                return Ok(new
            {
                message=jwt
            });
          
        }

        [Route("PreuzmiClana")]
        [HttpGet]
        public async Task<IActionResult> PreuzmiClana( )
        { 
          try{
            //validacija tokena
               var jwt=Request.Headers["Authorization"];
            
               var token = _jwtService.Verify(jwt);
               int korisnikId = int.Parse(token.Issuer);
               KorisnikSajta korisnik = await this.FindUserById(korisnikId);
               
               if(korisnik != null)
               {
                    if(korisnik.Tip==2)
                    {
                        ClanSkoleKlizanja clan = await Context.ClanoviSkoleKlizanja.Where(p=>p.Email==korisnik.Email).FirstOrDefaultAsync();
                        return Ok(clan);
                    }
                    else if(korisnik.Tip==1)
                    {
                        Instruktor instruktor = await Context.Instruktori.Where(p=>p.Email==korisnik.Email).FirstOrDefaultAsync();
                        return Ok(instruktor);
                    }
                    else return BadRequest();
               }
              
               else return BadRequest(new ErrorResponse(jwt.ToString()));

           }
            catch(Exception )
            {
                return Unauthorized();
            }

        }
       
        [Route("IzmeniClana/{id}")]
        [HttpPut]
        public async Task IzmeniClana(int id,[FromBody] ClanSkoleKlizanja clan)
        {
            var cl=await Context.ClanoviSkoleKlizanja.Where(p=>p.ID==id).FirstOrDefaultAsync();
           
            cl.Ime=clan.Ime;
            cl.Prezime=clan.Prezime;
            cl.Godine=clan.Godine;
            cl.Telefon=clan.Telefon;
            cl.Email=clan.Email;
            cl.Visina=clan.Visina;
            cl.Tezina=clan.Tezina;
            await Context.SaveChangesAsync();
        }
        
        [Route("IzmeniInstruktora/{id}")]
        [HttpPut]
        public async Task IzmeniInstruktora(int id,[FromBody]Instruktor instruktor)
        {
            var clan = await Context.Instruktori.Where(p=>p.ID==id).FirstOrDefaultAsync();
           
            clan.Ime = instruktor.Ime;
            clan.Prezime = instruktor.Prezime;
            clan.Godine = instruktor.Godine;
            clan.Telefon = instruktor.Telefon;
            clan.Email = instruktor.Email;
            
            await Context.SaveChangesAsync();
        }
        [Route("IzmeniVisinuTezinuKorisnika/{idClana}/{promenaTezina}/{promenaVisina}")]
        [HttpPut]
        public async Task IzmeniVisinuTezinuKorisnika(int idClana,float promenaTezina, float promenaVisina)
        {
            var cl=await Context.ClanoviSkoleKlizanja.Where(p=>p.ID==idClana).FirstOrDefaultAsync();
            cl.Tezina=promenaTezina;
            cl.Visina=promenaVisina;
            await Context.SaveChangesAsync();



        }
    //OVO MISLIM DA NECE DA SE KORISTI PROVERITI!!!!!!!

        // [Route("IzmeniTipTreninga/{id}/{tip}")]
        // [HttpPut]
        // public async Task IzmeniTipTreninga(int id,string tip)
        // {
        //    Trening trening= await Context.Treninzi.Where(p=>p.ID==id).FirstOrDefaultAsync();
           
        //    trening.Tip=tip;
          
        //   await Context.SaveChangesAsync();
    
        // }

        [Route("IzmeniSliku/{korIme}")]
        [HttpPut]
        public async Task<IActionResult> IzmeniSliku(string korIme,[FromForm]IFormFile profilnaFile)
        {
            var korisniksajta = await this.FindAnyUserByUserName(korIme);
            if(korisniksajta == null)
            {
                return BadRequest();
            }
            else
            {
              var slikaPom = await SacuvajSliku(profilnaFile);
              korisniksajta.Slika = String.Format("{0}://{1}{2}/Images/{3}",Request.Scheme,Request.Host,Request.PathBase,slikaPom);
              await Context.SaveChangesAsync();
                
              return Ok();
            }
        }

        [NonAction]
        public async Task<string> SacuvajSliku(IFormFile slika)
        {
            string imeSlike = new String (Path.GetFileNameWithoutExtension(slika.FileName).Take(10).ToArray()).Replace(' ','-');
            
            imeSlike = imeSlike+DateTime.Now.ToString("yymmssfff")+Path.GetExtension(slika.FileName);
            
            var slikaPath= Path.Combine(_hostEnvironment.ContentRootPath,"Images",imeSlike);
            using (var fileStream=new FileStream(slikaPath,FileMode.Create))
            {
                await slika.CopyToAsync(fileStream);
            }
            return imeSlike;

        }
        
        [Route("DodajCasoveInstruktora/{idCasa}/{idInstruktora}")]
        [HttpPost]
        public async Task DodajCasoveInstruktora(int idCasa, int idInstruktora)
        {
            InstruktoriCasovi instruktoriCasovi = new InstruktoriCasovi();
            instruktoriCasovi.InstruktorId = idInstruktora;
            instruktoriCasovi.CasId = idCasa;
            Context.InstruktoriCasovi.Add(instruktoriCasovi);
            await Context.SaveChangesAsync();
        }

        [Route("PreuzmiCasoveInstruktora/{id}")]
        [HttpGet]
        public async Task<List<Cas>> PreuzmiCasoveInstruktora(int id)
        {
            List<Cas> casovi = new List<Cas>();
            List<InstruktoriCasovi> instruktoriCasovi = await Context.InstruktoriCasovi.Where(p=>p.InstruktorId == id).ToListAsync();
            foreach (var x in instruktoriCasovi)
            {
                Cas cas = await Context.Casovi.Where(p=>p.ID == x.CasId).FirstOrDefaultAsync();
                casovi.Add(cas);   
            }
            return casovi;
        }

        [Route("PreuzmiInstruktoreCasa/{id}")]
        [HttpGet]
        public async Task<List<Instruktor>> PreuzmiInstruktoreCasa(int id)
        {
            List<Instruktor> instruktori = new List<Instruktor>();
            List<InstruktoriCasovi> instruktoriCasovi = await Context.InstruktoriCasovi.Where(p=>p.CasId == id).ToListAsync();
            foreach (var x in instruktoriCasovi)
            {
                Instruktor instruktor = await Context.Instruktori.Where(p=>p.ID == x.InstruktorId).FirstOrDefaultAsync();
                instruktori.Add(instruktor);
            }
            return instruktori;
        }

        [Route("PreuzmiInstruktoreICasove")]
        [HttpGet]
        public async Task<List<InstruktoriCasovi>> PreuzmiInstruktoreICasove()
        {
           return await Context.InstruktoriCasovi.ToListAsync();
        }

        [Route("KreirajNoviTermin/{id}")]
        [HttpPost]
        public async Task DodajNoviTerminCasa(int id, [FromBody]Termin termin)
        {
            Cas cas = await Context.Casovi.Include(p=>p.Termini).Where(p=>p.ID == id).FirstOrDefaultAsync();
            
            cas.Termini.Add(termin);
            Context.Termini.Add(termin);
            await Context.SaveChangesAsync();
        }

        [Route("ObrisiSveCasoveInstruktora")]
        [HttpDelete]
        public async Task ObrisiSveCasoveInstruktora()
        {
            List<InstruktoriCasovi> instruktoriCasovi = await Context.InstruktoriCasovi.ToListAsync();
            
            foreach (var x in instruktoriCasovi)
            {
                Context.InstruktoriCasovi.Remove(x);           
            }
            await Context.SaveChangesAsync();
        }

        [Route("ObrisiTermin/{id}")]
        [HttpDelete]
        public async Task ObrisiTermin(int id)
        {
            Termin termin = await Context.Termini.FindAsync(id);
            Context.Termini.Remove(termin);
            await Context.SaveChangesAsync();
        }

        [Route("PreuzmiTermine")]
        [HttpGet]
        public async Task<List<Termin>> PreuzmiTermine()
        {
            return await Context.Termini.ToListAsync();
        }

        [Route("PreuzmiTermine/{KorImeInstruktora}/{NazivCasa}")]
        [HttpGet]
        public async Task<List<Termin>> PreuzmiTermine(string KorImeInstruktora, string NazivCasa)
        {
            await this.ObrisiProsleTermine(NazivCasa);
            return await Context.Termini.Where(p=>p.NazivCasa == NazivCasa && p.KorisnickoImeInstruktora == KorImeInstruktora).ToListAsync();
        }

        [Route("PreuzmiTermine/{NazivCasa}")]
        [HttpGet]
        public async Task<List<Termin>> PreuzmiTermine(string NazivCasa)
        {
            await this.ObrisiProsleTermine(NazivCasa);
            return await Context.Termini.Where(p=>p.NazivCasa == NazivCasa).ToListAsync();
        }

        [Route("ObrisiProsleTermine/{NazivCasa}")]
        [HttpGet]
        public async Task  ObrisiProsleTermine(string NazivCasa)
        {
            string trDatum = DateTime.Now.ToString("MM/dd/yyyy");
            
            List<Termin> termini = await Context.Termini.Where(p=>p.NazivCasa == NazivCasa).ToListAsync();
            foreach (var termin in termini)
            {
                string [] datumTermin = termin.Datum.Split("/");
                    
                string [] datumDanas = trDatum.Split("/");
                if(Int16.Parse(datumTermin[0]) < Int16.Parse(datumDanas[0]) || Int16.Parse(datumTermin[0]) == Int16.Parse(datumDanas[0]) && Int16.Parse(datumTermin[1]) < Int16.Parse(datumDanas[1]) )
                {
                    Context.Termini.Remove(termin);
                }
            }
            await Context.SaveChangesAsync();
        }

        [Route("DodajTermineClanova/{idTermina}/{idClana}")]
        [HttpPost]
        public async Task<IActionResult> DodajTermineClanova(int idTermina, int idClana)
        {
            Termin termin = await Context.Termini.FindAsync(idTermina);
            ClanSkoleKlizanja clan = await Context.ClanoviSkoleKlizanja.Where(p=>p.ID == idClana).FirstOrDefaultAsync();
            
            if(termin.TrenutnoOsoba >= termin.MaxOsoba)
            {
                return StatusCode(452);
            }
            else 
            {
            termin.TrenutnoOsoba++;
            ClanoviTermini clanovitermini = new ClanoviTermini();
            clanovitermini.ClanoviId = idClana;
            clanovitermini.TerminId = idTermina;
            Context.ClanoviTermini.Add(clanovitermini);
            await Context.SaveChangesAsync();
            return Ok();
            }
        }

        [Route("PreuzmiTermineClana/{id}")]
        [HttpGet]
        public async Task<List<Termin>> PreuzmiTermineClana(int id)
        {
            List<Termin> termini = new List<Termin>();
            string trDatum = DateTime.Now.ToString("MM/dd/yyyy" );
            List<ClanoviTermini> clanovitermini = await Context.ClanoviTermini.Where(p=>p.ClanoviId == id).ToListAsync();
            foreach (var ter in clanovitermini)
            {
                Termin termin = await Context.Termini.Where(p=>p.ID == ter.TerminId).FirstOrDefaultAsync();
                if(termin != null)
                {
                    string [] datumTermin = termin.Datum.Split("/");
                
                    string [] datumDanas = trDatum.Split("-");
                    if(Int16.Parse(datumTermin[0]) > Int16.Parse(datumDanas[0]) || Int16.Parse(datumTermin[0]) == Int16.Parse(datumDanas[0]) && Int16.Parse(datumTermin[1]) >= Int16.Parse(datumDanas[1]) )
                    {
                        termini.Add(termin);
                    }
                }
            }
            return termini;
        }

        [Route("PreuzmiClanoveTermina/{id}")]
        [HttpGet]
        public async Task<List<ClanSkoleKlizanja>> PreuzmiClanoveTermina(int id)
        {
            List<ClanSkoleKlizanja> clanovi = new List<ClanSkoleKlizanja>();
            List<ClanoviTermini> clanovitermini = await Context.ClanoviTermini.Where(p=>p.TerminId == id).ToListAsync();
            foreach (var ter in clanovitermini)
            {
                ClanSkoleKlizanja clan = await Context.ClanoviSkoleKlizanja.Where(p=>p.ID == ter.ClanoviId).FirstOrDefaultAsync();
                clanovi.Add(clan);           
            }
            return clanovi;
        }

        [Route("ObrisiClanoveTermina/{id}")]
        [HttpDelete]
        public async Task ObrisiClanoveTermina(int id)
        {
            ClanoviTermini clanoviTermini = await Context.ClanoviTermini.FindAsync(id);
            Context.ClanoviTermini.Remove(clanoviTermini);
            await Context.SaveChangesAsync();
        }

        [Route("OtkaziTermin/{idClana}/{idTermina}")]
        [HttpDelete]
        public async Task OtkaziTermin(int idClana, int idTermina)
        {
            ClanoviTermini clanoviTermini = await  Context.ClanoviTermini.Where(p=>p.ClanoviId == idClana && p.TerminId == idTermina).FirstOrDefaultAsync();
            ClanSkoleKlizanja clan = await Context.ClanoviSkoleKlizanja.Where(p=>p.ID == idClana).FirstOrDefaultAsync();
            Termin termin = await Context.Termini.FindAsync(idTermina);
            Context.ClanoviTermini.Remove(clanoviTermini);
            termin.TrenutnoOsoba--;
            await Context.SaveChangesAsync();
        }

        [Route("PreuzmiClanoveITermine")]
        [HttpGet]
        public async Task<List<ClanoviTermini>> PreuzmiClanoveITermine()
        {
           return await Context.ClanoviTermini.ToListAsync();
        }
        
        [Route("ObrisiCasInstruktora/{idCasa}/{idInstruktora}")]
        [HttpDelete]
        public async Task ObrisiCasInstruktora(int idCasa, int idInstruktora)
        {
            InstruktoriCasovi instruktoriCasovi = await Context.InstruktoriCasovi.Where(p=>p.CasId == idCasa && p.InstruktorId == idInstruktora).FirstOrDefaultAsync();
            Context.Remove(instruktoriCasovi);
            await Context.SaveChangesAsync();
        }
    }
}
