import './homeContainer.css';


export function HomeConatiner({children}){
    return(
        <section className='home'>
            <div className='home-container'>
                <div className='placard'>
                    <span className='placard-text'>Create your own Store</span>
                </div>
                {children}
            </div>            
        </section>
    )
}