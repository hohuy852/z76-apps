"use client"

import Image from "next/image"
import styles from "./avatar-stack.module.css"
interface User {
  id: number
  name: string
  avatar: string
}

interface AvatarStackProps {
  users: User[]
  maxDisplayed?: number
}

export default function AvatarStack({ users, maxDisplayed = 5 }: AvatarStackProps) {
  const displayedUsers = users.slice(0, maxDisplayed)
  const remainingCount = users.length - maxDisplayed

  return (
    <div className={styles.avatarStack}>
      {displayedUsers.map((user, index) => (
        <div
          key={index}
          className={styles.avatarWrapper}
          style={{
            zIndex: displayedUsers.length - index,
          }}
        >
          <Image
            src="/placeholder-avatar.png" // {user.avatar}
            alt={`${user.name}'s avatar`}
            width={48}
            height={48}
            className={styles.avatar}
          />
        </div>
      ))}
      {remainingCount > 0 && (
        <div 
          className={`${styles.avatarWrapper} ${styles.remainingCount}`}
          style={{ zIndex: 0 }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  )
}

