//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EAuctionWebApp.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tblSellerMaster
    {
        public int SellerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Nullable<System.DateTime> DateofBirth { get; set; }
        public string EmailId { get; set; }
        public string Gender { get; set; }
        public Nullable<int> CountryId { get; set; }
        public Nullable<int> StateId { get; set; }
        public Nullable<int> Cityid { get; set; }
        public string Address { get; set; }
        public string Pincode { get; set; }
    }
}
