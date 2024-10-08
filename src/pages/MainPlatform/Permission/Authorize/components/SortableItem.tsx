import { classes_module } from '@/utils/class-module';
import { ProCard } from '@ant-design/pro-components';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useState } from 'react';
import styles from '../styles/sortable-item.less';
export function SortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

  const [width, setWidth] = useState();
  useEffect(() => {
    setWidth(props.containerRef.current.offsetWidth);
  }, []);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: width,
  };
  return (
    <div ref={setNodeRef} style={style}>
      <button {...attributes} {...listeners}>
        123
      </button>
      <ProCard layout="center" bordered className={classes_module(styles, 'card-container')}>
        {/*<button {...listeners} {...attributes}>*/}
        {/*  cc*/}
        {/*</button>*/}
        {/*<AuthCompanyList />*/}
      </ProCard>
    </div>
  );
}
