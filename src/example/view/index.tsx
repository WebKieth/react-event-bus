import { useEffect, useState } from "react"
import { useEventBusProvided } from "../../lib"

export const Button = ({ onClick }: {onClick: (event: React.MouseEvent<HTMLButtonElement>) => void}) => {
    return <button onClick={ (event) => onClick(event) }>{'click me'}</button>
}

export const Header = ({ children }: { children: React.ReactNode }) => {
    const bus = useEventBusProvided()
    return <div className="header" style={{
        width: '100%',
        padding: '16px 12px',
        backgroundColor: 'gray',
        display: 'flex',
        alignItems: 'center'
    }}>
        <div style={{
            marginRight: '16px'
        }}>
            <h3>inner header button</h3>
            <Button onClick={(e) => bus.$emit('onInnerHeaderClick', e)}/>
        </div>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            { children }
        </div>
    </div>
}
export const Body = ({ children }: { children: React.ReactNode | null }) => {
    const bus = useEventBusProvided()
    const [count, setCount] = useState(0)
    const handeInnerHeaderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setCount(count + 1)
    }
    useEffect(() => {
        bus.$on('onInnerHeaderClick', handeInnerHeaderClick)
        return () => bus.$un('onInnerHeaderClick', handeInnerHeaderClick)
    }, [count])
    return <div className="body" style={{
        padding: '40px 28px',
    }}>
        {children}
        <div>
            <h3>inner body counter</h3>
            <div>{count}</div>
        </div>
    </div>
}