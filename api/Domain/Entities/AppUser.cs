﻿using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    [Table("user_table")]
    public class AppUser
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string ContactMobile { get; set; }
        public string ContactTel { get; set; }
        public string ContactEmail { get; set; }
        public UserLv UserLv { get; set; } = UserLv.Lv3;
        public bool LoginPermit { get; set; } = false;
        public DateTime RegisterDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public string AddressState { get; set; }
        public string AddressSuburb { get; set; }
        public string AddressDetail { get; set; }
        public int PostCode { get; set; }
        public string Note { get; set; }
    }
}
