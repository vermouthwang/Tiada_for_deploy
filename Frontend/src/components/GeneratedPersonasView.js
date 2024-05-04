import PersonaItem from './GeneratedPersonas';

function GeneratedPersonasView(props) {
  const { personas } = props;
//   if (!Array.isArray(personas)) bnb{
//     return <div>Loading...</div>;
//   }
  const persona = personas.response;
if (persona !== undefined) {
    console.log(persona);
    console.log(persona[0].name);
    return (
        <div>
            <ul>
                {persona.map(persona => <PersonaItem persona={persona} />)}
            </ul>
        </div>
      );
    }
    return (
        <div>
            <p>
                No personas generated
            </p>
        </div>
    );
}



export default GeneratedPersonasView;