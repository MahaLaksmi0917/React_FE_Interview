import React from 'react'

function UseMemoChild() {
    console.log("child is getting redenered ...")
  return (
    <div>UseMemoChild</div>
  )
}

export default React.memo(UseMemoChild);