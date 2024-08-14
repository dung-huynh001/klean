import classNames from 'classnames/bind';
import styles from './Breadcrumb.module.scss'


const cx = classNames.bind(styles);
export interface iBreadCrumbItem {
    title: string,
    active?: boolean
}

interface BreadcrumbProps {
    BreadCrumbs: iBreadCrumbItem[];
}

function Breadcrumb({ BreadCrumbs }: BreadcrumbProps) {
    const pageTitle = BreadCrumbs.find((item) => item.active)
    return (
        <div className="container-fluid px-2 py-3">
            <div className="row">
                <h3>{pageTitle.title}</h3>
            </div>
            <div className="d-flex">
                {
                    BreadCrumbs.map((item, index) => {
                        return <span key={index} className={cx("breadcrumb-item", {
                            "active": item.active
                        })}>{item.title}</span>
                    })
                }
            </div>
        </div>
    );
}

export default Breadcrumb;