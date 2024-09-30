﻿using WebApi.DTOs;
using FluentValidation;
using WebApi.Utils;
using Domain.Entities;
using Infrastructure.Context;

namespace WebApi.Validations
{
	public class RegisterDtoValidator : AbstractValidator<RegisterDto>
	{
		public RegisterDtoValidator(AppDbContext context)
		{
			RuleFor(p => p.UserId)
				.NotNull()
				.NotEmpty()
				.WithMessage("User Id is required")
				.InclusiveBetween(10000000, 999999999)
				.WithMessage("User Id must have 8 digits");

			RuleFor(p => p.Username)
				.Length(8, 20)
				.WithMessage("Username must have 8 to 20 characters")
				.NotNull()
				.NotEmpty()
				.WithMessage("Username is required");

			RuleFor(p => p.Password)
				.NotNull()
				.NotEmpty().WithMessage("Username is required")
				.Length(8, 100)
				.WithMessage("Username must have 8 to 100 characters");

			RuleFor(p => p.DateOfBirth)
				.ExclusiveBetween(new DateTime(1970, 1, 1), DateTime.Now)
				.WithMessage("Date of birth is invalid");

			RuleFor(p => p.ContactMobile)
				.Length(10, 30)
				.WithMessage("Mobile is invalid");

			RuleFor(p => p.ContactEmail)
				.EmailAddress()
				.WithMessage("Email is invalid")
				.MaximumLength(30)
				.WithMessage("Email is too long");

			RuleFor(p => p.UserLv)
				.NotNull()
				.NotEmpty()
				.WithMessage("User level is required");
		}
	}
}
