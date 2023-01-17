using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace BackEnd.Response
{
    public class ErrorResponse
    {
        public IEnumerable<string> ErrorMessages {get;set;}

        public ErrorResponse(IEnumerable<string> err)
        {
            this.ErrorMessages=err;
        }
        public ErrorResponse(string errorMessage):this(new List<string>(){errorMessage})
        {
            
        }
        
        
    }
}