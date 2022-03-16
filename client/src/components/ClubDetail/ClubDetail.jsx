import React from 'react';


const detail = {
    id: 1,
    name: 'La pelota no se mancha',
    description: 'ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni',
    location: 'Av. San Martín 1042, CABA',
    openHour: 8,
    closeHour: 22,
    image: 'https://picsum.photos/200/300',
    score: '5' }

const Clubdetail = () => {
    return (
        <div className='clubDetail'>
            <img src={detail.image} alt={detail.name} />
            <h1>{detail.name}</h1>
            <h3>{detail.location}</h3>
            <p>{detail.description}</p>
            <p>horario: de {detail.openHour} a {detail.closeHour}</p>
            
        </div>
    );
}

export default Clubdetail;
