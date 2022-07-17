import './Steps.css'

function Steps({currentStep}) {
    return (
        <div className="component-section">
            <h2>Le déroulement du vote</h2>
            <h3 className="bold" id="current-step">{currentStep}</h3>
            <p>
                Le propriétaire du contrat ouvrira la session des propositions après avoir ajouté les électeurs.
                Une fois la sessions des propositions closes, l'ouverture de la session de vote aura lieu.
                la proposition ayant récolté le plus de votes sera retenue.
            </p>
        </div>
    )
}

export default Steps;
