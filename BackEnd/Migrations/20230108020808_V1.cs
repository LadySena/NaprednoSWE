using Microsoft.EntityFrameworkCore.Migrations;

namespace BackEnd.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClanoviTermini",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClanoviId = table.Column<int>(type: "int", nullable: false),
                    TerminId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClanoviTermini", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "InstruktoriCasovi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CasId = table.Column<int>(type: "int", nullable: false),
                    InstruktorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstruktoriCasovi", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "SkolaKlizanja",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SkolaKlizanja", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Cas",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cena = table.Column<int>(type: "int", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SkolaKlizanjaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cas", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Cas_SkolaKlizanja_SkolaKlizanjaID",
                        column: x => x.SkolaKlizanjaID,
                        principalTable: "SkolaKlizanja",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ClanSkoleKlizanja",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Visina = table.Column<float>(type: "real", nullable: false),
                    Tezina = table.Column<float>(type: "real", nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Godine = table.Column<int>(type: "int", nullable: false),
                    Telefon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Sifra = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PovrdaSifre = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RAND_SALT = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tip = table.Column<int>(type: "int", nullable: false),
                    SkolaKlizanjaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClanSkoleKlizanja", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ClanSkoleKlizanja_SkolaKlizanja_SkolaKlizanjaID",
                        column: x => x.SkolaKlizanjaID,
                        principalTable: "SkolaKlizanja",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Instruktor",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Godine = table.Column<int>(type: "int", nullable: false),
                    Telefon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Sifra = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PovrdaSifre = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RAND_SALT = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tip = table.Column<int>(type: "int", nullable: false),
                    SkolaKlizanjaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Instruktor", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Instruktor_SkolaKlizanja_SkolaKlizanjaID",
                        column: x => x.SkolaKlizanjaID,
                        principalTable: "SkolaKlizanja",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Termin",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KorisnickoImeInstruktora = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImeInstruktora = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PrezimeTrenera = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Datum = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VremePocetka = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VremeKraja = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TrenutnoOsoba = table.Column<int>(type: "int", nullable: false),
                    MaxOsoba = table.Column<int>(type: "int", nullable: false),
                    CasID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Termin", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Termin_Cas_CasID",
                        column: x => x.CasID,
                        principalTable: "Cas",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cas_SkolaKlizanjaID",
                table: "Cas",
                column: "SkolaKlizanjaID");

            migrationBuilder.CreateIndex(
                name: "IX_ClanSkoleKlizanja_SkolaKlizanjaID",
                table: "ClanSkoleKlizanja",
                column: "SkolaKlizanjaID");

            migrationBuilder.CreateIndex(
                name: "IX_Instruktor_SkolaKlizanjaID",
                table: "Instruktor",
                column: "SkolaKlizanjaID");

            migrationBuilder.CreateIndex(
                name: "IX_Termin_CasID",
                table: "Termin",
                column: "CasID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClanoviTermini");

            migrationBuilder.DropTable(
                name: "ClanSkoleKlizanja");

            migrationBuilder.DropTable(
                name: "Instruktor");

            migrationBuilder.DropTable(
                name: "InstruktoriCasovi");

            migrationBuilder.DropTable(
                name: "Termin");

            migrationBuilder.DropTable(
                name: "Cas");

            migrationBuilder.DropTable(
                name: "SkolaKlizanja");
        }
    }
}
