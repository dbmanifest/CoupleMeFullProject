"use client";

import { useEffect, useState } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import StyleCard from "../card/StyleCard";
import EthnicityModal from "../modal/Ethnicity/EditModal";
import EthnicityDeleteModal from "../modal/Ethnicity/DeleteModal";
import EthnicityPostModal from "../modal/Ethnicity/PostModal";
import { CIcon } from "@coreui/icons-react";
import { cibAddthis } from "@coreui/icons";
import Pagination1 from "@/components/section/Pagination1";
import Loader from "@/components/loader/Loader";

export default function EthnicityInfo() {
  const [ethnicities, setEthnicities] = useState([]);
  const [selectedEthnicity, setselectedEthnicity] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Added state for search query
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [loading, setLoading] = useState(false);

  async function fetchEthnicities() {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/ethnicity?page=${currentPage}&limit=5&search=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      console.log(data);

      setEthnicities(data.Ethnicities);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching ethnicities:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (ethnicity) => {
    setselectedEthnicity(ethnicity);
  };

  const handleDelete = (ethnicity) => {
    setselectedEthnicity(ethnicity);
  };

  const handleSaveEthnicity = async (updatedEthnicity) => {
    try {
      const response = await fetch(`/api/ethnicity/${updatedEthnicity.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEthnicity),
      });

      const data = await response.json();
      setEthnicities(ethnicities.map((c) => (c.id === data.id ? data : c)));
    } catch (error) {
      console.error("Error updating ethnicity:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await fetch(`/api/ethnicity/${selectedEthnicity.id}`, {
        method: "DELETE",
      });
      setEthnicities(ethnicities.filter((c) => c.id !== selectedEthnicity.id));
    } catch (error) {
      console.error("Error deleting ethnicity:", error);
    }
  };

  const handlePostSave = async (newEthnicity) => {
    try {
      const response = await fetch("/api/ethnicity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEthnicity),
      });
      if (!response.ok) {
        throw new Error("Failed to create ethnicity");
      }
      const data = await response.json();
      setEthnicities([...ethnicities, data]);
      fetchEthnicities();
    } catch (error) {
      console.error("Error posting ethnicity:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Filter styles based on search query
  useEffect(() => {
    fetchEthnicities();
  }, [currentPage, searchQuery, totalPages]);

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area items-center justify-between p-4 bg-white shadow-md rounded-lg">
              <div className="flex justify-between items-center">
                <div className="flex justify-between w-52 h-12 items-center">
                  <h2 className="text-xl font-semibold">Ethnicities</h2>

                  {/* <button
                    data-bs-toggle="modal"
                    data-bs-target="#ethnicityPostModal"
                    className="bg-blue-300 text-black px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors "
                  >
                    +
                  </button> */}
                  <CIcon
                    icon={cibAddthis}
                    size="sm"
                    data-bs-toggle="modal"
                    data-bs-target="#ethnicityPostModal"
                    className=" text-black px-9 py-2 rounded-lg transition-colors hover:cursor-pointer hover:px-8"
                  />
                </div>
                <div className="row  flex items-center">
                  <div className="col-lg-12">
                    <input
                      type="text"
                      placeholder="Search Ethnicities"
                      className="form-input px-4 py-2 border rounded-lg w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="packages_table table-responsive">
                <table className="table-style3 table at-savesearch">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">Image</th> {/* New Column */}
                      <th scope="col">Ethnicity</th> {/* New Column */}
                      <th scope="col">Prompt</th>
                      <th scope="col" className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="text-center">
                          <Loader />
                        </td>
                      </tr>
                    ) : (
                      ethnicities?.map((item, i) => (
                        <StyleCard
                          key={i}
                          data={item}
                          onEdit={() => handleEdit(item)}
                          onDelete={() => handleDelete(item)}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {totalPages > 1 && (
          <Pagination1
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <EthnicityModal
        ethnicity={selectedEthnicity}
        onSave={handleSaveEthnicity}
      />
      <EthnicityDeleteModal onConfirm={handleDeleteConfirm} />
      <EthnicityPostModal onSave={handlePostSave} />
    </>
  );
}
