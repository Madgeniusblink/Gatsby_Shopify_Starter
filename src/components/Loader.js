import React, { useContext } from "react"
import { animated, useTransition } from 'react-spring'
import { StoreContext } from '../context/StoreContext'
import Loading from '../images/loading.svg'


const Loader = () => {
    const { isLoading } = useContext(StoreContext)
  
    const transitions = useTransition(isLoading, null, {
        from: { transform: 'translate3d(100%, 0, 0)', opacity: 0 },
        enter: { transform: 'translate3d(0, 0, 0)', opacity: .5 },
        leave: { transform: 'translate3d(100%, 0, 0)', opacity: 0 }
      })

    return transitions.map(
        ({ item, key, props }) => 
            item && (
                <animated.div 
                    key={key}
                    style={{ 
                        zIndex: 1000, 
                        position: "fixed", 
                        top: 0, 
                        left: 0,
                        right: 0, 
                        bottom: 0, 
                        background: "var(--xtraPurp)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        ...props,
                        }}
                        
                    >
                    {/* you can full the svg from gatsby-Img to optimzie the site */}
                    <img src={Loading} alt="loading shopping cart" />
                </animated.div>
            )

    )

}

export default Loader
