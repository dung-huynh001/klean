using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using WebApi.DTOs;
using WebApi.ResponseModels;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly IValidator<RegisterDto> _validator;

        public AuthController(AuthService authService, IValidator<RegisterDto> validator)
        {
            this._authService = authService;
            this._validator = validator;
        }
        [HttpPost("Register")]
        public async Task<IActionResult> RegisterAsync(RegisterDto model)
        {
            try
            {
                var result = await _validator.ValidateAsync(model);
                if(!result.IsValid)
                {
                    string errors = JsonSerializer.Serialize(result.Errors);
                    throw new InvalidDataException(errors);
                }
                RegisterResponse res = await _authService.RegisterAsync(model);
                return Ok(res);
            }
            catch
            {
                throw;
            }
        }

        [HttpPost("Login")]
        public async Task<IActionResult> LoginAsync(LoginDto dto)
        {
            AuthResponse res = await _authService.LoginAsync(dto);
            return Ok(res);
        }

        [Authorize(Roles="Lv1")]
        [HttpGet("ViewProfile/{id}")]
        public async Task<IActionResult> ViewProfile(int id)
        {
            return Ok("Token valid");
        }

        [Authorize(Roles = "Lv2")]
        [HttpGet("UpdateUser/{id}")]
        public async Task<IActionResult> UpdateUser(int id)
        {
            return Ok("Token valid");
        }

        [Authorize(Roles = "Lv3")]
        [HttpGet("UserList")]
        public async Task<IActionResult> UserList()
        {
            return Ok("Token valid");
        }
    }
}
