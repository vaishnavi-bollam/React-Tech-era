import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Home/index'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoData()
  }

  getFormattedData = data => ({
    name: data.name,
    imageUrl: data.image_url,
    id: data.id,
    description: data.description,
  })

  getVideoData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = `https://apis.ccbp.in/te/courses/${id}`

    const response = await fetch(url)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log('items', fetchedData)

      //   const updatedData = fetchedData.course_details.map(eachVideo => ({
      //     name: eachVideo.name,
      //     imageUrl: eachVideo.image_url,
      //     id: eachVideo.id,
      //     description: eachVideo.description,
      //   }))

      //   const updatedData = fetchedData.course_details
      //     name: eachVideo.name,
      //     logoUrl: eachVideo.logo_url,
      //     id: eachVideo.id,
      //   }))
      const updatedData = this.getFormattedData(fetchedData.course_details)
      this.setState({
        productsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderVideosListView = () => {
    const {productsData} = this.state
    const {imageUrl, description, name} = productsData
    return (
      <div>
        <img src={imageUrl} alt={name} />
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
        alt="failure view"
      />
    </div>
  )

  renderAllVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>{this.renderAllVideos()}</div>
      </div>
    )
  }
}

export default CourseItemDetails
