using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
namespace BackEnd.Services
{
    public class JwtService
    {
        private string securityKey="0TjrED4Ag5otmv-zXYKjlGu73glokiAtQ72HlcptvMn8dhSad-fSiPtUPnLkETbdDX3mWp4_lgac--qQfpHMATAlAK8Aw0vseATcSMTb1aUkyeKi585EqXekM5tBKqWftmmqbhW_2uVdsGT58HVdWCjVV6TSprBRCPqKWgw5l_0";
    
        public JwtSecurityToken Verify(string jwt)
        {
            var tokenHandler= new JwtSecurityTokenHandler();
            var key=Encoding.ASCII.GetBytes(securityKey);
            tokenHandler.ValidateToken(jwt,new TokenValidationParameters()
            {
                IssuerSigningKey=new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey=true,
                ValidateIssuer=false,
                ValidateAudience=false

            },out SecurityToken validatedToken);
             return(JwtSecurityToken)validatedToken;
        }
    }
}