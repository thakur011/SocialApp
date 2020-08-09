using System.Linq;
using AutoMapper;
using SocialApp.API.Dtos;
using SocialApp.API.Models;

namespace SocialApp.API.Helpers
{
    //Auto mapper uses profile to help her understand the source and destination
    //of what is mapping
    public class AutoMapperProfiles :Profile
    {
        //Class to tell Auto Mapper about mapping that we need it to support.
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                        opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age, opt => 
                        opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                        opt.MapFrom(src => src.Photos.FirstOrDefault(d => d.IsMain).Url))
                .ForMember(dest => dest.Age, opt => 
                        opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
                        
            CreateMap<Photo, PhotosForDetailedDto>();
        }
    }
}