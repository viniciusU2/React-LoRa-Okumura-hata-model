import styled from  "styled-components"


export const MapContaniner = styled.div`
 
  width: 60vw;
  height: 100vh;

  `

export const FormLogin = styled.form`
 
width: 10rem;
height: 10rem;
display: flex;
  align-items: center;
  justify-content: center;


`

export const Content = styled.div`
  display: grid;
  grid-template-columns: rem 1fr;
  height: 100vh;
  gap: 0;
  grid-template-areas: 
  'left right';

  @media (max-width: 768px) {
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'right'
    'left';
}

`
export const LeftContent = styled.div`
  
  grid-area: left;
  background: white;
  max-height:100vh;
  max-width: 40rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    max-width:100vw;
    
}

  

`
export const RightContent = styled.div`
  
  grid-area: right;
  max-height:100vh;
  display: flex;
  justify-content:space-between;
  align-items: center;
  flex-direction:column;

  




`

export const FormContent = styled.form`

  max-height:100vh;


  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;
  padding-left: 5rem;
 



  h2{
      margin-top: 4   .8rem;
      font-family: sans-serif;
      font-size: 1.8rem;
  }

 button {
  background-color: #1e40af; /* azul-800 */
  color: #ffffff; /* branco */
  border-radius: 0.5rem; /* rounded-md */
  width: min(23rem, 50vw);
  height: 2.5rem; /* equivalente a h-10 */
  padding: 0 1rem; /* equivalente a px-6 */
  font-size: 1rem;
  font-weight: 500;
  font-family: system-ui, sans-serif;
  line-height: 1.5;
  margin: 10vh auto;
  display: block;
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

button:hover {
  background-color: #1d4ed8; /* azul-700 */
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* efeito de foco */
}

button:disabled {
  background-color: #e5e7eb; /* cinza-200 */
  color: #9ca3af; /* cinza-400 */
  cursor: not-allowed;
}




`

export const InputGroup = styled.div`
height: 3.5rem; 
padding: 35px;
display: flex;
align-items: center;
justify-content: center;


input {
  border: none;
  border-bottom: 2px solid var(--blue_800);
  outline: none;
  padding: 5px;
  transition: border-color 0.3s ease;
  width: min(39.5rem,80vw);
  font-size: 2rem; 

  &:focus {
    border-color: #007bff;
  }
}

select {
  --backgound-color:transparent;
  --backgound:transparent;

  border: none;
  border-bottom: 2px solid var(--blue_800);
  outline: none;
  padding: 5px;
  transition: border-color 0.3s ease;
  width: min(39.5rem,80vw);
  font-size: 2rem; 
}

p {
  color:var(--red_500);
}
`;

  