"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";

const paddleWidth = 22;
const paddleY = 89;
const ballSize = 2.1;
const brickRows = 2;
const brickCols = 8;
const brickWidth = 9.2;
const brickHeight = 5.2;
const brickGapX = 1.4;
const brickGapY = 2.1;
const brickStartX = 8.7;
const brickStartY = 15;

type Brick = {
  id: number;
  x: number;
  y: number;
  alive: boolean;
};

type GameState = {
  ballX: number;
  ballY: number;
  velocityX: number;
  velocityY: number;
  paddleX: number;
  bricks: Brick[];
  score: number;
  playing: boolean;
  ended: boolean;
};

function createBricks(): Brick[] {
  return Array.from({ length: brickRows * brickCols }, (_, index) => {
    const row = Math.floor(index / brickCols);
    const col = index % brickCols;

    return {
      id: index,
      x: brickStartX + col * (brickWidth + brickGapX),
      y: brickStartY + row * (brickHeight + brickGapY),
      alive: true
    };
  });
}

function createInitialState(): GameState {
  return {
    ballX: 49,
    ballY: 75,
    velocityX: 0.46,
    velocityY: -0.58,
    paddleX: 39,
    bricks: createBricks(),
    score: 0,
    playing: false,
    ended: false
  };
}

export function NotFoundRunner() {
  const [game, setGame] = useState<GameState>(() => createInitialState());
  const gameRef = useRef(game);
  const frameRef = useRef<number | null>(null);
  const fieldRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    gameRef.current = game;
  }, [game]);

  const startOrReset = useCallback(() => {
    setGame((current) => {
      if (current.ended || current.bricks.every((brick) => !brick.alive)) {
        return { ...createInitialState(), playing: true };
      }

      if (current.playing) {
        return current;
      }

      return { ...current, playing: true };
    });
  }, []);

  const movePaddle = useCallback((nextX: number) => {
    setGame((current) => ({
      ...current,
      paddleX: Math.max(0, Math.min(100 - paddleWidth, nextX))
    }));
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "Enter") {
        event.preventDefault();
        startOrReset();
      }

      if (event.code === "ArrowLeft") {
        event.preventDefault();
        movePaddle(gameRef.current.paddleX - 5.2);
      }

      if (event.code === "ArrowRight") {
        event.preventDefault();
        movePaddle(gameRef.current.paddleX + 5.2);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [movePaddle, startOrReset]);

  useEffect(() => {
    const tick = () => {
      const current = gameRef.current;

      if (current.playing && !current.ended) {
        let nextX = current.ballX + current.velocityX;
        let nextY = current.ballY + current.velocityY;
        let nextVelocityX = current.velocityX;
        let nextVelocityY = current.velocityY;
        let nextScore = current.score;
        let nextBricks = current.bricks;

        if (nextX <= 0 || nextX >= 100 - ballSize) {
          nextVelocityX *= -1;
          nextX = Math.max(0, Math.min(100 - ballSize, nextX));
        }

        if (nextY <= 0) {
          nextVelocityY *= -1;
          nextY = 0;
        }

        const ballCenterX = nextX + ballSize / 2;
        const ballBottom = nextY + ballSize;
        const paddleHit =
          ballBottom >= paddleY &&
          ballBottom <= paddleY + 4.5 &&
          ballCenterX >= current.paddleX &&
          ballCenterX <= current.paddleX + paddleWidth &&
          nextVelocityY > 0;

        if (paddleHit) {
          const offset = (ballCenterX - (current.paddleX + paddleWidth / 2)) / (paddleWidth / 2);
          nextVelocityX = offset * 0.95;
          nextVelocityY = -Math.abs(nextVelocityY);
          nextY = paddleY - ballSize;
        }

        const hitBrick = nextBricks.find(
          (brick) =>
            brick.alive &&
            nextX + ballSize >= brick.x &&
            nextX <= brick.x + brickWidth &&
            nextY + ballSize >= brick.y &&
            nextY <= brick.y + brickHeight
        );

        if (hitBrick) {
          nextBricks = nextBricks.map((brick) =>
            brick.id === hitBrick.id ? { ...brick, alive: false } : brick
          );
          nextVelocityY *= -1;
          nextScore += 1;
        }

        const cleared = nextBricks.every((brick) => !brick.alive);
        const missed = nextY > 100;

        setGame({
          ...current,
          ballX: missed ? current.ballX : nextX,
          ballY: missed ? current.ballY : nextY,
          velocityX: nextVelocityX,
          velocityY: nextVelocityY,
          bricks: nextBricks,
          score: nextScore,
          playing: !missed && !cleared,
          ended: missed || cleared
        });
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const movePaddleFromPointer = (event: PointerEvent<HTMLButtonElement>) => {
    const rect = fieldRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const x = ((event.clientX - rect.left) / rect.width) * 100 - paddleWidth / 2;
    movePaddle(x);
  };

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.focus();
    event.currentTarget.setPointerCapture(event.pointerId);
    movePaddleFromPointer(event);
    startOrReset();
  };

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    movePaddleFromPointer(event);
  };

  const status = game.bricks.every((brick) => !brick.alive)
    ? "CLEAR"
    : game.ended
      ? "RETRY"
      : game.playing
        ? "MOVE"
        : "START";

  return (
    <button
      ref={fieldRef}
      type="button"
      className="fx-not-found-runner"
      onClick={startOrReset}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      aria-label="404ミニゲーム。押すと開始、左右キーまたはポインターでパドルを動かします。"
    >
      <span className="fx-not-found-runner-score">
        {String(game.score).padStart(2, "0")} / {String(brickRows * brickCols).padStart(2, "0")}
      </span>
      <span className="fx-not-found-runner-bricks" aria-hidden="true">
        {game.bricks.map((brick) => (
          <span
            key={brick.id}
            className={`fx-not-found-runner-brick${brick.alive ? "" : " is-hidden"}`}
            style={{ left: `${brick.x}%`, top: `${brick.y}%` }}
          />
        ))}
      </span>
      <span
        className="fx-not-found-runner-ball"
        style={{ left: `${game.ballX}%`, top: `${game.ballY}%` }}
      />
      <span className="fx-not-found-runner-paddle" style={{ left: `${game.paddleX}%` }} />
      <span className="fx-not-found-runner-hint">{status} / TAP・← →</span>
    </button>
  );
}
