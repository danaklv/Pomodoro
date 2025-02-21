import lightbackgroundImage from '../assets/img/light.jpg';
import darktbackgroundImage from '../assets/img/space.jpg';


export const lightTheme = {
    bodyBackground: `url(${lightbackgroundImage}) no-repeat center/cover fixed`,
  
    textColor: 'rgb(85, 119, 138)',
    cardBackground: 'rgba(255, 255, 255, 0.47)',
    
    primaryColor: 'rgb(52, 130, 208)',
    secondaryColor: 'rgb(52, 130, 208)',
    borderColor: '#F6F7EB',
    buttonHover: 'rgb(218, 190, 153)',

  
    navBackground: '#ffffff',
    primaryText: '#235789',
    linkHover: '#3A5683'
};

export const darkTheme = {
    bodyBackground: `url(${darktbackgroundImage}) no-repeat center/cover fixed`,
    textColor: '#dfe6e9',
    cardBackground: 'rgba(10, 38, 59, 0.47)',
    primaryColor: '#1B263B',
    secondaryColor: 'rgba(10, 38, 59)',
    borderColor: '#636e72',
    buttonHover: 'rgb(29, 129, 172)',

    // Добавленные свойства
    navBackground: '#1B263B',
    primaryText: '#dfe6e9',
    linkHover: '#81ecec'
};

