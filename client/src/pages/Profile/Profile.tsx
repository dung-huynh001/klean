import Breadcrumb, { iBreadCrumbItem } from "~/layouts/components/Breadcrumb/Breadcrumb";

function Profile() {
    const breadCrumbs: iBreadCrumbItem[] = [
        {
            title: "Home",
        },
        {
            title: "Profile",
            active: true,
        }
    ]

    return (
        <div className="container-fluid bg-white">
            <Breadcrumb BreadCrumbs={breadCrumbs}></Breadcrumb>
        </div>
    );
}

export default Profile;