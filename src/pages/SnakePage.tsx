import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type Point = { x: number; y: number }
type Dir = 'up' | 'down' | 'left' | 'right'

const GRID = 20 // 20x20
const TICK_MS = 120

function randFood(exclude: Point[]): Point {
  while (true) {
    const p = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }
    if (!exclude.some((s) => s.x === p.x && s.y === p.y)) return p
  }
}

export default function SnakePage() {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }])
  const [dir, setDir] = useState<Dir>('right')
  const [food, setFood] = useState<Point>(() => randFood([{ x: 10, y: 10 }]))
  const [score, setScore] = useState(0)
  const [running, setRunning] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const pendingDir = useRef<Dir>('right')

  // Derived set for quick collision checks
  const snakeSet = useMemo(() => new Set(snake.map((s: Point) => `${s.x},${s.y}`)), [snake])

  const step = useCallback(() => {
  setDir((prev: Dir) => pendingDir.current || prev)
  setSnake((prev: Point[]) => {
      const curDir = pendingDir.current
      const head = prev[0]
      const next: Point =
        curDir === 'up' ? { x: head.x, y: head.y - 1 } :
        curDir === 'down' ? { x: head.x, y: head.y + 1 } :
        curDir === 'left' ? { x: head.x - 1, y: head.y } :
        { x: head.x + 1, y: head.y }

      // Wall collision
      if (next.x < 0 || next.y < 0 || next.x >= GRID || next.y >= GRID) {
        setGameOver(true)
        setRunning(false)
        return prev
      }

      // Self collision (allow tail if moving forward without eating)
      const tail = prev[prev.length - 1]
  const hitsSelf = prev.some((p: Point) => {
        // Exclude current tail position because it will move unless we eat
        if (p.x === tail.x && p.y === tail.y) return false
        return p.x === next.x && p.y === next.y
      })
      if (hitsSelf) {
        setGameOver(true)
        setRunning(false)
        return prev
      }

      // Move
      const newSnake = [next, ...prev]
      const eats = next.x === food.x && next.y === food.y
      if (eats) {
  setScore((s: number) => s + 1)
        setFood(randFood(newSnake))
      } else {
        newSnake.pop()
      }
      return newSnake
    })
  }, [food])

  // Game loop
  useEffect(() => {
    if (!running || gameOver) return
    const id = setInterval(step, TICK_MS)
    return () => clearInterval(id)
  }, [running, gameOver, step])

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      const d: Record<string, Dir> = { arrowup: 'up', w: 'up', arrowdown: 'down', s: 'down', arrowleft: 'left', a: 'left', arrowright: 'right', d: 'right' }
      const next = d[k]
      if (!next) return
      // Prevent reversing directly
      const isOpposite = (a: Dir, b: Dir) => (a === 'up' && b === 'down') || (a === 'down' && b === 'up') || (a === 'left' && b === 'right') || (a === 'right' && b === 'left')
      if (isOpposite(dir, next)) return
      pendingDir.current = next
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [dir])

  const reset = () => {
    setSnake([{ x: 10, y: 10 }])
    setDir('right')
    pendingDir.current = 'right'
    setFood(randFood([{ x: 10, y: 10 }]))
    setScore(0)
    setGameOver(false)
    setRunning(true)
  }

  const cellClass = useCallback((x: number, y: number) => {
    const isHead = snake[0]?.x === x && snake[0]?.y === y
    const isBody = snakeSet.has(`${x},${y}`)
    const isFood = food.x === x && food.y === y
    return [
      'aspect-square w-full rounded-sm transition-colors',
      isHead ? 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,.7)]' :
      isBody ? 'bg-white/70' :
      isFood ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.7)]' :
      'bg-white/[.06]'
    ].join(' ')
  }, [snake, snakeSet, food])

  return (
    <div className="section py-10 md:py-14">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="section-title">Snake</h1>
          <p className="section-subtitle">Use arrow keys or WASD. Don’t hit yourself.</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="rounded border border-white/10 bg-white/5 px-3 py-1">Score: {score}</span>
          <button onClick={() => setRunning((r: boolean) => !r)} className="rounded border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10">
            {running ? 'Pause' : 'Resume'}
          </button>
          <button onClick={reset} className="rounded border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10">Reset</button>
        </div>
      </div>

      <div className="mx-auto max-w-md">
        <div
          className="grid gap-0.5 rounded-xl border border-white/10 bg-white/5 p-2"
          style={{ gridTemplateColumns: `repeat(${GRID}, minmax(0,1fr))` }}
        >
          {Array.from({ length: GRID * GRID }).map((_, i) => {
            const x = i % GRID
            const y = Math.floor(i / GRID)
            return <div key={i} className={cellClass(x, y)} />
          })}
        </div>

        {gameOver && (
          <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-200">
            Game over. Score: {score}. <button className="underline" onClick={reset}>Play again</button>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-center gap-3 md:hidden">
        {['up','left','down','right'].map((d) => (
          <button
            key={d}
            className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm capitalize hover:bg-white/10"
            onClick={() => {
              const next = d as Dir
              const isOpposite = (a: Dir, b: Dir) => (a === 'up' && b === 'down') || (a === 'down' && b === 'up') || (a === 'left' && b === 'right') || (a === 'right' && b === 'left')
              if (!isOpposite(dir, next)) pendingDir.current = next
            }}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  )
}
